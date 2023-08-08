import { RedisCommand } from "../../redis-command/redis.command";

export class RedisService {
    private redis = RedisCommand.getRedisConnectionInstande();

    async setObjectKey(key, valueObject): Promise<string> {
        return await this.redis.set(JSON.stringify(key), JSON.stringify(valueObject), "EX", 30);
    }

    async getRedis(key): Promise<any> {
        const data = await this.redis.get(JSON.stringify(key));
        return JSON.parse(JSON.stringify(data));
    }

    async checkExpRedisKey(key): Promise<number> {
      return await this.redis.ttl(JSON.stringify(key));
    }
}