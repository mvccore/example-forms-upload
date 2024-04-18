<?php

namespace App;

class Bootstrap {

	/**
	 * @return \MvcCore\Application
	 */
	public static function Init () {

		$app = \MvcCore\Application::GetInstance();


		// Patch core to use extended debug class:
		if (class_exists('MvcCore\Ext\Debugs\Tracy')) {
			\MvcCore\Ext\Debugs\Tracy::$Editor = 'MSVS2019';
			$app->SetDebugClass('MvcCore\Ext\Debugs\Tracy');
		}


		/**
		 * Set up old protection CSRF type and old PHPDocs syntax 
		 * to keep maximum compatibility for this example:
		 */
		$app
			->SetCsrfProtection($app::CSRF_PROTECTION_COOKIE) // new way, best to  work in multiple tabs
			//->SetCsrfProtection($app::CSRF_PROTECTION_FORM_INPUT) // old, but most compatible way
			->SetAttributesAnotations(TRUE); // PHP >= 8.0
			//->SetAttributesAnotations(FALSE); // PHP < 8.0 compatibility


		// Set up application routes (without custom names),
		// defined basically as `Controller::Action` combinations:
		\MvcCore\Router::GetInstance([
			'Index:Index'			=> [
				'match'				=> '#^/(index\.php)?$#',
				'reverse'			=> '/',
			]
		]);
		

		return $app;
	}
}
