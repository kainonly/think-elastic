<?php
declare(strict_types=1);

namespace tests;

use think\elastic\common\ElasticFactory;
use think\elastic\service\ElasticService;

class ElasticTest extends BaseTest
{
    /**
     * @var ElasticFactory
     */
    private $elastic;

    public function setUp(): void
    {
        parent::setUp();
        $this->app->register(ElasticService::class);
        $this->elastic = $this->app->get('elastic');
    }

    public function testIndex()
    {
        $response = $this->elastic->client()->index([
            'index' => 'test',
            'id' => 'one',
            'body' => [
                'name' => 'elastic',
                'value' => 1
            ]
        ]);
        $this->assertNotEmpty($response);
        $this->assertEquals(1, $response['_shards']['successful']);
    }

    public function testDelete()
    {
        $response = $this->elastic->client()->delete([
            'index' => 'test',
            'id' => 'one'
        ]);
        $this->assertNotEmpty($response);
        $this->assertEquals(1, $response['_shards']['successful']);
    }
}