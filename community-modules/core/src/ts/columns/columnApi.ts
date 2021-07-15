import { ColDef, ColGroupDef } from "../entities/colDef";
import { ColumnGroupChild } from "../entities/columnGroupChild";
import { ColumnModel, ColumnState } from "./columnModel";
import { OriginalColumnGroup } from "../entities/originalColumnGroup";
import { ColumnGroup } from "../entities/columnGroup";
import { Column } from "../entities/column";
import { Autowired, Bean, PreDestroy } from "../context/context";
import { _ } from "../utils";
import { ColumnEventType } from "../events";

@Bean('columnApi')
export class ColumnApi {

    @Autowired('columnModel') private columnModel: ColumnModel;

    public sizeColumnsToFit(gridWidth: any): void {
        // AG-3403 validate that gridWidth is provided because this method has the same name as
        // a method on the grid API that takes no arguments, and it's easy to confuse the two
        if (typeof gridWidth === "undefined") {
            console.error('AG Grid: missing parameter to columnApi.sizeColumnsToFit(gridWidth)');
        }
        this.columnModel.sizeColumnsToFit(gridWidth, 'api');
    }
    public setColumnGroupOpened(group: OriginalColumnGroup | string, newValue: boolean): void { this.columnModel.setColumnGroupOpened(group, newValue, 'api'); }
    public getColumnGroup(name: string, instanceId?: number): ColumnGroup | null { return this.columnModel.getColumnGroup(name, instanceId); }
    public getOriginalColumnGroup(name: string): OriginalColumnGroup | null { return this.columnModel.getOriginalColumnGroup(name); }

    public getDisplayNameForColumn(column: Column, location: string | null): string { return this.columnModel.getDisplayNameForColumn(column, location) || ''; }
    public getDisplayNameForColumnGroup(columnGroup: ColumnGroup, location: string): string { return this.columnModel.getDisplayNameForColumnGroup(columnGroup, location) || ''; }

    public getColumn(key: any): Column | null { return this.columnModel.getPrimaryColumn(key); }
    public applyColumnState(params: ApplyColumnStateParams): boolean { return this.columnModel.applyColumnState(params, 'api'); }
    public getColumnState(): ColumnState[] { return this.columnModel.getColumnState(); }
    public resetColumnState(): void { this.columnModel.resetColumnState('api'); }
    public getColumnGroupState(): {groupId: string, open: boolean}[] {return this.columnModel.getColumnGroupState(); }
    public setColumnGroupState(stateItems: ({groupId: string, open: boolean})[]): void {this.columnModel.setColumnGroupState(stateItems, 'api'); }
    public resetColumnGroupState(): void { this.columnModel.resetColumnGroupState('api'); }

    public isPinning(): boolean { return this.columnModel.isPinningLeft() || this.columnModel.isPinningRight(); }
    public isPinningLeft(): boolean { return this.columnModel.isPinningLeft(); }
    public isPinningRight(): boolean { return this.columnModel.isPinningRight(); }
    public getDisplayedColAfter(col: Column): Column | null { return this.columnModel.getDisplayedColAfter(col); }
    public getDisplayedColBefore(col: Column): Column | null { return this.columnModel.getDisplayedColBefore(col); }
    public setColumnVisible(key: string | Column, visible: boolean): void { this.columnModel.setColumnVisible(key, visible, 'api'); }
    public setColumnsVisible(keys: (string | Column)[], visible: boolean): void { this.columnModel.setColumnsVisible(keys, visible, 'api'); }
    public setColumnPinned(key: string | Column, pinned: string): void { this.columnModel.setColumnPinned(key, pinned, 'api'); }
    public setColumnsPinned(keys: (string | Column)[], pinned: string): void { this.columnModel.setColumnsPinned(keys, pinned, 'api'); }

    public getAllColumns(): Column[] | null { return this.columnModel.getAllPrimaryColumns(); }
    public getAllGridColumns(): Column[] { return this.columnModel.getAllGridColumns(); }
    public getDisplayedLeftColumns(): Column[] { return this.columnModel.getDisplayedLeftColumns(); }
    public getDisplayedCenterColumns(): Column[] { return this.columnModel.getDisplayedCenterColumns(); }
    public getDisplayedRightColumns(): Column[] { return this.columnModel.getDisplayedRightColumns(); }
    public getAllDisplayedColumns(): Column[] { return this.columnModel.getAllDisplayedColumns(); }
    public getAllDisplayedVirtualColumns(): Column[] { return this.columnModel.getViewportColumns(); }

    public moveColumn(key: string | Column, toIndex: number): void {
        if (typeof key === 'number') {
            // moveColumn used to take indexes, so this is advising user who hasn't moved to new method name
            console.warn('AG Grid: you are using moveColumn(fromIndex, toIndex) - moveColumn takes a column key and a destination index, not two indexes, to move with indexes use moveColumnByIndex(from,to) instead');
            this.columnModel.moveColumnByIndex(key as number, toIndex, 'api');
        } else {
            this.columnModel.moveColumn(key, toIndex, 'api');
        }
    }
    public moveColumnByIndex(fromIndex: number, toIndex: number): void { this.columnModel.moveColumnByIndex(fromIndex, toIndex, 'api'); }
    public moveColumns(columnsToMoveKeys: (string | Column)[], toIndex: number) { this.columnModel.moveColumns(columnsToMoveKeys, toIndex, 'api'); }

    public moveRowGroupColumn(fromIndex: number, toIndex: number): void { this.columnModel.moveRowGroupColumn(fromIndex, toIndex); }
    public setColumnAggFunc(key: string | Column, aggFunc: string): void { this.columnModel.setColumnAggFunc(key, aggFunc); }

    public setColumnWidth(key: string | Column, newWidth: number, finished: boolean = true, source?: ColumnEventType): void {
        this.columnModel.setColumnWidths([{key, newWidth}], false, finished, source);
    }
    public setColumnWidths(columnWidths: {key: string | Column, newWidth: number}[], finished: boolean = true, source?: ColumnEventType): void {
        this.columnModel.setColumnWidths(columnWidths, false, finished, source);
    }

    public setPivotMode(pivotMode: boolean): void { this.columnModel.setPivotMode(pivotMode); }
    public isPivotMode(): boolean { return this.columnModel.isPivotMode(); }
    public getSecondaryPivotColumn(pivotKeys: string[], valueColKey: string | Column): Column | null { return this.columnModel.getSecondaryPivotColumn(pivotKeys, valueColKey); }

    public setValueColumns(colKeys: (string | Column)[]): void { this.columnModel.setValueColumns(colKeys, 'api'); }
    public getValueColumns(): Column[] { return this.columnModel.getValueColumns(); }
    public removeValueColumn(colKey: (string | Column)): void { this.columnModel.removeValueColumn(colKey, 'api'); }
    public removeValueColumns(colKeys: (string | Column)[]): void { this.columnModel.removeValueColumns(colKeys, 'api'); }
    public addValueColumn(colKey: (string | Column)): void { this.columnModel.addValueColumn(colKey, 'api'); }
    public addValueColumns(colKeys: (string | Column)[]): void { this.columnModel.addValueColumns(colKeys, 'api'); }

    public setRowGroupColumns(colKeys: (string | Column)[]): void { this.columnModel.setRowGroupColumns(colKeys, 'api'); }
    public removeRowGroupColumn(colKey: string | Column): void { this.columnModel.removeRowGroupColumn(colKey, 'api'); }
    public removeRowGroupColumns(colKeys: (string | Column)[]): void { this.columnModel.removeRowGroupColumns(colKeys, 'api'); }
    public addRowGroupColumn(colKey: string | Column): void { this.columnModel.addRowGroupColumn(colKey, 'api'); }
    public addRowGroupColumns(colKeys: (string | Column)[]): void { this.columnModel.addRowGroupColumns(colKeys, 'api'); }
    public getRowGroupColumns(): Column[] { return this.columnModel.getRowGroupColumns(); }

    public setPivotColumns(colKeys: (string | Column)[]): void { this.columnModel.setPivotColumns(colKeys, 'api'); }
    public removePivotColumn(colKey: string | Column): void { this.columnModel.removePivotColumn(colKey, 'api'); }
    public removePivotColumns(colKeys: (string | Column)[]): void { this.columnModel.removePivotColumns(colKeys, 'api'); }
    public addPivotColumn(colKey: string | Column): void { this.columnModel.addPivotColumn(colKey, 'api'); }
    public addPivotColumns(colKeys: (string | Column)[]): void { this.columnModel.addPivotColumns(colKeys, 'api'); }
    public getPivotColumns(): Column[] { return this.columnModel.getPivotColumns(); }

    public getLeftDisplayedColumnGroups(): ColumnGroupChild[] { return this.columnModel.getDisplayedTreeLeft(); }
    public getCenterDisplayedColumnGroups(): ColumnGroupChild[] { return this.columnModel.getDisplayedTreeCentre(); }
    public getRightDisplayedColumnGroups(): ColumnGroupChild[] { return this.columnModel.getDisplayedTreeRight(); }
    public getAllDisplayedColumnGroups(): ColumnGroupChild[] | null { return this.columnModel.getAllDisplayedTrees(); }
    public autoSizeColumn(key: string | Column, skipHeader?: boolean): void {return this.columnModel.autoSizeColumn(key, skipHeader, 'api'); }
    public autoSizeColumns(keys: (string | Column)[], skipHeader?: boolean): void {return this.columnModel.autoSizeColumns(keys, skipHeader, 'api'); }
    public autoSizeAllColumns(skipHeader?: boolean): void { this.columnModel.autoSizeAllColumns(skipHeader, 'api'); }

    public setSecondaryColumns(colDefs: (ColDef | ColGroupDef)[]): void { this.columnModel.setSecondaryColumns(colDefs, 'api'); }

    public getSecondaryColumns(): Column[] | null { return this.columnModel.getSecondaryColumns(); }
    public getPrimaryColumns(): Column[] | null { return this.columnModel.getAllPrimaryColumns(); }

    @PreDestroy
    private cleanDownReferencesToAvoidMemoryLeakInCaseApplicationIsKeepingReferenceToDestroyedGrid(): void {
        // some users were raising support issues with regards memory leaks. the problem was the customers applications
        // were keeping references to the API. trying to educate them all would be difficult, easier to just remove
        // all references in teh API so at least the core grid can be garbage collected.
        //
        // wait about 100ms before clearing down the references, in case user has some cleanup to do,
        // and needs to deference the API first
        setTimeout(_.removeAllReferences.bind(window, this, 'Column API'), 100);
    }

    // below goes through deprecated items, prints message to user, then calls the new version of the same method

    // public getColumnDefs(): (ColDef | ColGroupDef)[] {
    //     this.setColumnGroupOpened(group, newValue);
    //     return null;
    // }

    public columnGroupOpened(group: OriginalColumnGroup | string, newValue: boolean): void {
        console.error('AG Grid: columnGroupOpened no longer exists, use setColumnGroupOpened');
        this.setColumnGroupOpened(group, newValue);
    }
    public hideColumns(colIds: any, hide: any): void {
        console.error('AG Grid: hideColumns is deprecated, use setColumnsVisible');
        this.columnModel.setColumnsVisible(colIds, !hide, 'api');
    }
    public hideColumn(colId: any, hide: any): void {
        console.error('AG Grid: hideColumn is deprecated, use setColumnVisible');
        this.columnModel.setColumnVisible(colId, !hide, 'api');
    }

    public setState(columnState: ColumnState[]): boolean {
        console.error('AG Grid: setState is deprecated, use setColumnState');
        return this.setColumnState(columnState);
    }

    public getState(): ColumnState[] {
        console.error('AG Grid: getState is deprecated, use getColumnState');
        return this.getColumnState();
    }
    public resetState(): void {
        console.error('AG Grid: resetState is deprecated, use resetColumnState');
        this.resetColumnState();
    }

    public getAggregationColumns(): Column[] {
        console.error('AG Grid: getAggregationColumns is deprecated, use getValueColumns');
        return this.columnModel.getValueColumns();
    }

    public removeAggregationColumn(colKey: (string | Column)): void {
        console.error('AG Grid: removeAggregationColumn is deprecated, use removeValueColumn');
        this.columnModel.removeValueColumn(colKey, 'api');
    }

    public removeAggregationColumns(colKeys: (string | Column)[]): void {
        console.error('AG Grid: removeAggregationColumns is deprecated, use removeValueColumns');
        this.columnModel.removeValueColumns(colKeys, 'api');
    }

    public addAggregationColumn(colKey: (string | Column)): void {
        console.error('AG Grid: addAggregationColumn is deprecated, use addValueColumn');
        this.columnModel.addValueColumn(colKey, 'api');
    }

    public addAggregationColumns(colKeys: (string | Column)[]): void {
        console.error('AG Grid: addAggregationColumns is deprecated, use addValueColumns');
        this.columnModel.addValueColumns(colKeys, 'api');
    }

    public setColumnAggFunction(column: Column, aggFunc: string): void {
        console.error('AG Grid: setColumnAggFunction is deprecated, use setColumnAggFunc');
        this.columnModel.setColumnAggFunc(column, aggFunc, 'api');
    }

    public getDisplayNameForCol(column: any): string {
        console.error('AG Grid: getDisplayNameForCol is deprecated, use getDisplayNameForColumn');
        return this.getDisplayNameForColumn(column, null);
    }

    public setColumnState(columnState: ColumnState[]): boolean {
        return this.columnModel.applyColumnState({state: columnState, applyOrder: true}, 'api');
    }

}

export interface ApplyColumnStateParams {
    state?: ColumnState[];
    applyOrder?: boolean;
    defaultState?: ColumnState;
}
