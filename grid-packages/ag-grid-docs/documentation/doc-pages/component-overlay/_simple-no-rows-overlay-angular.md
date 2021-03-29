[[only-angular]]
|Below is a simple example of a no rows overlay component class:
|
|```js
|import {Component} from '@angular/core';
|import {INoRowsOverlayParams} from "@ag-grid-community/core";
|import {INoRowsOverlayAngularComp} from "@ag-grid-community/angular";
|
|@Component({
|    selector: 'app-no-rows-overlay',
|    template: `
|      <div class="ag-overlay-loading-center" style="background-color: lightcoral;">
|        <i class="far fa-frown"> {{ this.params.noRowsMessageFunc() }} </i>
|      </div>`
|})
|export class CustomNoRowsOverlay implements INoRowsOverlayAngularComp {
|    private params: INoRowsOverlayParams;
|
|    agInit(params: INoRowsOverlayParams): void {
|        this.params = params;
|    }
|}
|```