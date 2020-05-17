<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithTitle;

class PreGroupExport implements FromArray,WithTitle
{
    protected $array;
    protected $title;
    public function __construct (array $array,string $title) {
        $this->array=$array;
        $this->title=$title;
    }

    public function array (): array {
        // TODO: Implement array() method.
        return $this->array;
    }

    public function title (): string {
        // TODO: Implement title() method.
        return $this->title;
    }
}
