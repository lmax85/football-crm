<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\API;
use App\Models\User;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/me', function(Request $request) {
        return response()->json([
            'data' => [
                'user' => auth()->user(),
                'roles' => ['admin'],
                'name' => 'Max',
                'avatar' => '',
                'introduction' => 'introduction',
            ]
        ]);
    });

    Route::post('/auth/logout', [AuthController::class, 'logout']);
});


Route::group(['prefix' => '/v1', 'namespace' => 'Api'], function () {
    Route::get('/ping', function () {
        return 'ok';
    });
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
