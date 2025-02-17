import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { EmailDto } from './dto/email.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AuthGuardCustom } from './auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { LoginGoogle } from './auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerForClient(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.createAccountForClient(createAuthDto);
  }

  @Post('login')
  loginForClient(@Body() loginDto: LoginDto) {
    return this.authService.loginForClient(loginDto);
  }
  @Post('admin/login')
  loginForAdmin(@Body() loginDto: LoginDto) {
    return this.authService.loginForAdmin(loginDto);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    console.log(req)
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    // redirect to home page
    let infoUser : LoginGoogle = req.user
    const data = await this.authService.loginWithGoogle(infoUser)

    const html = `
    <script>
      window.opener.postMessage({ token: "${data.data.accessToken}" }, "${process.env.FRONTEND_URL}");
      window.close();
    </script>
  `;
  res.send(html);
   
  }

  @Post('verify-otp')
  verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.authService.verifyOTP(verifyOtpDto.email, verifyOtpDto.otp);
  }

  @Post('send-otp')
  sendOtp(@Body() emailDto: EmailDto) {
    return this.authService.sendOTP(emailDto.email);
  }

  @UseGuards(AuthGuardCustom)
  @Post('change-password')
  changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    if(changePasswordDto.newPassword !== changePasswordDto.newPasswordConfirm){
      return {
        message: 'Mật khẩu không khớp'
      }
    }
    return this.authService.changePassword(changePasswordDto);
  }

  @Post('forgot-password')
  forgotPassword(@Body() emailDto: EmailDto) {
    return this.authService.forgotPassword(emailDto.email);
  }


 
}
