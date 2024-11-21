<?php

namespace App\Forms;

use \MvcCore\Ext\Forms,
	\MvcCore\Ext\Forms\Fields,
	\MvcCore\Ext\Forms\Validators;

class FileUpload extends \MvcCore\Ext\Form
{
	protected $cssClasses = ['theme'];

	protected $method = \MvcCore\IRequest::METHOD_POST;

	public function Init ($submit = FALSE) {
		parent::Init($submit);
		
		if ($this->id === 'form_upload') {
			$filesValidator = new Validators\Files;
			$filesField = new Fields\File;
			$this->enctype = \MvcCore\Ext\IForm::ENCTYPE_MULTIPART;
		} else if ($this->id === 'ajax_upload') {
			$filesValidator = new Validators\AjaxFiles;
			$filesField = new Fields\AjaxFile;
			$this->enctype = \MvcCore\Ext\IForm::ENCTYPE_URLENCODED;
		}
		
		$filesValidator
			->SetAllowedFileNameChars('\-\.\,_a-zA-Z0-9')
			->AddBombScanners([
				'\\MvcCore\\Ext\\Forms\\Validators\\Files\\Validations\\BombScanners\\PngImage'
			])
			->SetPngImageMaxWidthHeight(300);
		
		$filesField
			->SetRequired(TRUE)
			->SetMaxSize(100*1024*1024) // 100 MB
			->SetMultiple(TRUE)
			->SetMaxCount(3)
			->SetAccept(['image/gif','image/jpeg','image/png'])
			->SetName('files')
			->SetLabel('Images')
			->SetValidators([$filesValidator]);

		$send = (new Fields\SubmitButton)
			->SetName('send');
		
		$this->AddFields($filesField, $send);
	}

	public function PreDispatch($submit = FALSE) {
		parent::PreDispatch($submit);
		if (!$this->viewEnabled) return $this;
		
	}

	public function Submit (array & $rawRequestParams = []) {
		parent::Submit($rawRequestParams);
		if ($this->result === self::RESULT_SUCCESS) {
			try {
				$files = [];
				$values = (object) $this->values;
				if ($values->files && count($values->files) > 0) {
					$targetBasePath = $this->application->GetPathVar(TRUE) . '/Files/';
					foreach ($values->files as $file) {
						if ($file->error) continue;
						$targetFullPath = $targetBasePath . $file->name;

						if ($this->id === 'form_upload') {
							$moved = move_uploaded_file($file->tmpFullPath, $targetFullPath);
						} else if ($this->id === 'ajax_upload') {
							// it's not possible to move it by `move_uploaded_file()` if it is submitted via AJAX:
							$moved = rename($file->tmpFullPath, $targetFullPath);
						}

						if ($moved) {
							unset($file->tmpFullPath);
							$file->fullPath = $targetFullPath;
							$files[] = $file;
						}
					}
				}
				unset($values);
				$this->values['files'] = $files;

			} catch (\Throwable $e) {
				\MvcCore\Debug::Exception($e);
				$this->AddError('Error when moving uploaded file. See more in application log.');
			}
		}
		return [
			$this->result,
			$this->values,
			$this->errors,
		];
	}
}