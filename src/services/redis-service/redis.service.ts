import { RedisCommand } from "../../redis-command/redis.command";

export class RedisService {
    private redis = RedisCommand.getRedisConnectionInstande();

    async setObjectKey(key:string, valueObject): Promise<string> {
        return await this.redis.set(key, JSON.stringify(valueObject), "EX", 30);
    }

    async getRedis(key:string): Promise<any> {
        const data = await this.redis.get(key);
        return JSON.parse(JSON.stringify(data));
    }

    async checkExpRedisKey(key: string): Promise<number> {
      return await this.redis.ttl(key);
    }
}