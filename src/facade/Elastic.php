<?php

namespace think\elastic\facade;

use Elasticsearch\Client;
use think\Facade;

/**
 * Class Elastic
 * @method static Client client(string $label = 'default') ElasticSearch 客户端
 * @method static Client create(string $label) 创建 ElasticSearch 客户端
 * @package think\elastic\facade
 */
final class Elastic extends Facade
{
    protected static function getFacadeClass()
    {
        return 'elastic';
    }
}