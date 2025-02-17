import { Injectable } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class RedisService {
    
    private client;

    constructor(
       
    ) {
        // Kết nối đến Redis server
        this.client = createClient({
            url: 'redis://127.0.0.1:6379', // URL Redis
        });

         // Xử lý lỗi kết nối
        this.client.on('error', (err) => {
        console.error('Redis Client Error:', err);
        });

        // Kết nối Redis
        this.client.connect();
    }

     async checkConnection(): Promise<boolean> {
    try {
      const pong = await this.client.ping();
      return pong === 'PONG'; // Nếu kết nối thành công, Redis sẽ trả về "PONG"
    } catch (error) {
      console.error('Redis Connection Check Failed:', error);
      return false;
    }
  }

    async set(key: string, value: string, ttl?: number): Promise<void> {
        await this.client.set(key, value);
        if (ttl) {
            await this.client.expire(key, ttl); // Đặt thời gian hết hạn (TTL)
        }
    }

    async get(key: string): Promise<string | null> {
        return this.client.get(key);
    }

    async del(key: string): Promise<void> {
        await this.client.del(key);
    }
}
