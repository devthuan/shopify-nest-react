import { Controller, Get, Post, Body, Patch, Param, Delete, Req, BadRequestException, Query, Sse, Res, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { CommonException } from 'src/common/exception';
import { plainToInstance } from 'class-transformer';
import { from, interval, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Notification } from './entities/notification.entity';
import { AuthGuardCustom } from '../auth/auth.guard';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

    // server event
//  @Sse('stream')
//   stream(): Observable<any> {
//     return interval(1000).pipe(
//       map((count) => ({
//         data: `Server time: ${new Date().toISOString()} - Count: ${count}`,
//       })),
//     );
    
//   }

  @Sse('stream')
stream(): Observable<any> {
  return interval(1000).pipe( // Cứ 5 giây fetch dữ liệu một lần
    switchMap(() => from(this.notificationsService.findAll("", 1, 10, "createdAt", "ASC"))),
    map((notifications) => ({
      data: notifications,
    })),
  );
}
  


  @UseGuards(AuthGuardCustom)
  @Post()
  create(@Req() request: Request, @Body() createNotificationDto: CreateNotificationDto) {
    try {
      if(createNotificationDto.typeSend === "role" && !createNotificationDto.roleId){
      throw new BadRequestException("roleId is required for role type notification")
    }
     if(createNotificationDto.typeSend === "user" && !createNotificationDto.email){
      throw new BadRequestException("email is required for user type notification")
    }
    createNotificationDto.accountId = request['user'].id
    return this.notificationsService.create(createNotificationDto);
    } catch (error) {
      CommonException.handle(error)
    }
  }

  @UseGuards(AuthGuardCustom)
  @Get()
  findAll(
    @Query('search') search: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sortBy') sortBy: string,
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
    @Query() query: Record<string, any>
  ) {
    const {search : _search, page: _page, limit: _limit, sortBy: _sortBy, sortOrder: _sortOrder, ...filters } = query;
    limit > 100? limit = 100 : limit;
    const data = this.notificationsService.findAll(search, page, limit, sortBy, sortOrder, filters);
    return plainToInstance(Notification, data);
  }

  @UseGuards(AuthGuardCustom)
  @Get('user')
  allNotificationByAccount(
    @Req() request: Request,
    @Query('search') search: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sortBy') sortBy: string,
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
    @Query() query: Record<string, any>

  ) {
    const {search : _search, page: _page, limit: _limit, sortBy: _sortBy, sortOrder: _sortOrder, ...filters } = query;
    limit > 100? limit = 100 : limit;
    let accountId = request['user'].id;
    const data = this.notificationsService.allNotificationByAccount(accountId, search, page, limit, sortBy, sortOrder, filters);
    return plainToInstance(Notification, data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationsService.updateNoti(id, updateNotificationDto);
  }

  @Patch('read/:id')
  readNotification(@Param('id') id: string) {
    return this.notificationsService.readNotification(id);
  }

  @Delete(':id')
  deleteSoft(@Param('id') id: string) {
    return this.notificationsService.deleteSoftNotification(id);
  }
  
  @UseGuards(AuthGuardCustom)
  @Delete('/user/:id')
  deleteSoftUser(@Req() request: Request, @Param('id') id: string) {
    let accountId = request['user'].id
    return this.notificationsService.deleteSoftUser(id, accountId);
  }


 
}
