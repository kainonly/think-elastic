<?php

use OSS\Core\OssException;
use OSS\OssClient;
use RingCentral\Psr7\Request;
use RingCentral\Psr7\Response;

function handler(Request $request): Response
{
    $raw = $request->getBody()->getContents();
    if (empty($raw)) {
        return new Response(200, [], 'request without body!');
    }
    $env = getenv();
    try {
        $bucket = $env['Bucket'];
        $ossClient = new OssClient(
            $env['AccessKeyID'],
            $env['AccessKeySecret'],
            $env['EndPoint']
        );
        $body = json_decode($raw, true);
        $ossClient->putObject($bucket, 'packages.json', json_encode($body));
        return new Response(200, [], json_encode([
            'error' => 0,
            'msg' => 'ok'
        ]));
    } catch (OssException $exception) {
        return new Response(200, [], [
            'error' => 1,
            'msg' => $exception->getMessage()
        ]);
    }
}