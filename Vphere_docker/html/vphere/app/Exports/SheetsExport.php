<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class SheetsExport implements WithMultipleSheets
{
    protected $sheets;

    public function __construct(array $sheets)
    {
        $this->sheets = $sheets;
    }

    public function sheets (): array {
        // TODO: Implement sheets() method.
        $sheets =[];
        foreach ($this->sheets as $arr){
            $sheets[]=new PreGroupExport($arr[0],$arr[1]);
        }
        return  $sheets;
    }

}
