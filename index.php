<?php

use OSS\OssClient;
use OSS\Core\OssException;
use RingCentral\Psr7\Request;
use RingCentral\Psr7\Response;

/**
 * Aliyun serverless initializer
 * @param mixed $context
 */
function initializer($context)
{
    try {
        $env = getenv();
        $GLOBALS['bucket'] = $env['Bucket'];
        $GLOBALS['oss'] = new OssClient(
            $env['AccessKeyID'],
            $env['AccessKeySecret'],
            $env['EndPoint']
        );
    } catch (OssException $exception) {
        echo $exception->getMessage();
    }
}

/**
 * Aliyun serverless handler
 * @param Request $request
 * @return Response
 */
function handler(Request $request): Response
{
    $raw = $request->getBody()->getContents();
    if (empty($raw)) {
        return new Response(200, [], 'request without body!');
    }
    $body = json_decode($raw, true);
    $sha1 = sha1(time());
    $include = 'include/all$' . $sha1 . '.json';
    $packages = [
        'packages' => [],
        'includes' => [
            $include => [
                'sha1' => $sha1
            ]
        ]
    ];
    putObject('packages.json', $packages);
    return new Response(200, [], json_encode([
        'error' => 0,
        'msg' => 'ok'
    ]));
}

/**
 * putObject to Aliyun OSS
 * @param string $name file name
 * @param array $body content
 */
function putObject(string $name, array $content)
{
    $GLOBALS['oss']->putObject(
        $GLOBALS['bucket'],
        $name,
        json_encode($content)
    );
}