<?php

namespace App\Controllers;

use \MvcCore\Controller\AutoInit;
use \App\Forms\FileUpload;

class Index extends Base {

	protected $autoInitProperties = TRUE;

	/**
	 * @autoInit createFormUploadForm
	 * @var FileUpload
	 */
	#[AutoInit]
	protected FileUpload $formUploadForm;
	
	/**
	 * @autoInit createAjaxUploadForm
	 * @var FileUpload
	 */
	#[AutoInit]
	protected FileUpload $ajaxUploadForm;


	/**
	 * Render page with upload form.
	 * @return void
	 */
	public function IndexAction () {
		$this->view->title = 'Files uploading';

		$this->view->formUploadForm = $this->formUploadForm;
		$this->view->ajaxUploadForm = $this->ajaxUploadForm;

		$this->view->uploadedFiles = $this->getUploadedFiles();
	}

	public function SubmitAction () {
		foreach ($this->getUploadedFiles(TRUE) as $file) 
			unlink($file->path);

		$submitType = $this->GetParam('submit_type', 'a-z');

		if ($submitType === 'form') {

			list ($result) = $this->formUploadForm->Submit();
			if ($result === FileUpload::RESULT_SUCCESS)
				$this->formUploadForm->ClearSession();
			$this->formUploadForm->SubmittedRedirect();	
			
		} else if ($submitType === 'ajax') {
			list ($result, , $errors) = $this->ajaxUploadForm->Submit();

			if ($result === FileUpload::RESULT_SUCCESS)
				$this->ajaxUploadForm->ClearSession();
			$this->JsonResponse([
				'result'	=> $result,
				'values'	=> $this->getUploadedFiles(),
				'errors'	=> $errors,
			]);
			
		}
	}
	
	protected function createFormUploadForm () {
		$indexUrl = $this->Url(':Index');
		return (new FileUpload($this))
			->SetId('form_upload')
			->SetAction($this->Url(':Submit', ['submit_type' => 'form']))
			->SetErrorUrl($indexUrl)
			->SetSuccessUrl($indexUrl);
	}
	
	protected function createAjaxUploadForm () {
		$indexUrl = $this->Url(':Index');
		return (new FileUpload($this))
			->SetId('ajax_upload')
			->SetAction($this->Url(':Submit', ['submit_type' => 'ajax']))
			->SetErrorUrl($indexUrl)
			->SetSuccessUrl($indexUrl);
	}

	protected function getUploadedFiles ($includingPath = FALSE) {
		$uploadedFiles = [];
		$filesRelPath = '/Var/Files';
		$basePath = $this->request->GetBasePath();
		$appRoot = $this->request->GetAppRoot();
		$di = new \DirectoryIterator($appRoot . $filesRelPath);
		foreach ($di as $item) {
			$fileName = $item->getFilename();
			if (!$item->isDot() && $fileName !== '.dummy') {
				$relPathAndFileName = $filesRelPath . '/' . $fileName;
				$uploadedFile = (object) [
					'name'	=> $fileName,
					'url'	=> $basePath . $relPathAndFileName,
					'time'	=> filemtime($appRoot . $relPathAndFileName),
				];
				if ($includingPath)
					$uploadedFile->path = $appRoot . $relPathAndFileName;
				$uploadedFiles[] = $uploadedFile;
			}
		}
		return $uploadedFiles;
	}
	
	/**
	 * Render not found action.
	 * @return void
	 */
	public function NotFoundAction(){
		$this->ErrorAction();
	}

	/**
	 * Render possible server error action.
	 * @return void
	 */
	public function ErrorAction () {
		$code = $this->response->GetCode();
		if ($code === 200) $code = 404;
		$this->view->title = "Error {$code}";
		$this->view->message = $this->request->GetParam('message', FALSE);
		$this->Render('error');
	}

}
