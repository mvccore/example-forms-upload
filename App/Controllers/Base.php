<?php

namespace App\Controllers;

use \MvcCore\Ext\Tools\Csp;

class Base extends \MvcCore\Controller {
	
	public function PreDispatch () {
		parent::PreDispatch();

		if (!$this->viewEnabled) return;
			
		$this->view->basePath = $this->request->GetBasePath();

		$this->preDispatchSetUpAssets();
		$this->preDispatchSetUpCsp();
	}

	protected function preDispatchSetUpAssets () {
		\MvcCore\Ext\Views\Helpers\Assets::SetGlobalOptions(
			(array) \MvcCore\Config::GetConfigSystem()->assets
		);
		$static = $this->application->GetPathStatic();
		$this->view->Css('fixedHead')
			->Append($static . '/css/components/resets.css')
			->Append($static . '/css/components/old-browsers-warning.css')
			->AppendRendered($static . '/css/components/fonts.css')
			->AppendRendered($static . '/css/components/forms-and-controls.css')
			->AppendRendered($static . '/css/layout.css')
			->AppendRendered($static . '/css/content.css');
		$this->view->Js('fixedHead')
			->Append($static . '/ts/node_modules/ajax-min/builds/latest/ajax.min.js')
			->Append($static . '/js/build/Module.js');
		$this->view->Js('varFoot')
			//->Append($static . '/js/build/TestImages.js')
			->Append($static . '/js/build/Front.js');
	}

	
	protected function preDispatchSetUpCsp () {
		$csp = Csp::GetInstance();
		$csp
			->Disallow(
				Csp::FETCH_DEFAULT_SRC | 
				Csp::FETCH_OBJECT_SRC
			)
			->AllowSelf(
				Csp::FETCH_SCRIPT_SRC | 
				Csp::FETCH_STYLE_SRC | 
				Csp::FETCH_IMG_SRC |
				Csp::FETCH_FONT_SRC |
				Csp::FETCH_MEDIA_SRC |
				Csp::FETCH_CONNECT_SRC |
				Csp::FETCH_FRAME_SRC
			)
			->AllowHosts(
				Csp::FETCH_SCRIPT_SRC, [
					'https://cdnjs.com/',
				]
			)
			->AllowHosts(
				Csp::FETCH_IMG_SRC, [
					'data:'
				]
			)
			->AllowNonce(Csp::FETCH_SCRIPT_SRC)
			->AllowStrictDynamic(Csp::FETCH_SCRIPT_SRC)
			->AllowUnsafeInline(Csp::FETCH_STYLE_SRC);

		$this->view->nonce = $csp->GetNonce();

		$this->application->AddPreSentHeadersHandler(function ($req, \MvcCore\IResponse $res) {
			$csp = Csp::GetInstance();
			$res->SetHeader($csp->GetHeaderName(), $csp->GetHeaderValue());
		});
	}
}
