/// <reference path="../utils.ts" />
/// <reference path="../constants.ts" />
/// <reference path="../svgFactory.ts" />
/// <reference path="../headerRendering/renderedHeaderElement.ts" />
/// <reference path="../headerRendering/renderedHeaderCell.ts" />
/// <reference path="../headerRendering/renderedHeaderGroupCell.ts" />

module ag.grid {

    var utils = Utils;

    export class HeaderRenderer {

        private gridOptionsWrapper: GridOptionsWrapper;
        private columnController: ColumnController;
        private angularGrid: Grid;
        private filterManager: FilterManager;
        private $scope: any;
        private $compile: any;
        private ePinnedHeader: HTMLElement;
        private ePinnedRightHeader: HTMLElement;
        private eHeaderContainer: HTMLElement;
        private eRoot: HTMLElement;

        private headerElements: RenderedHeaderElement[] = [];

        public init(gridOptionsWrapper: GridOptionsWrapper, columnController: ColumnController, gridPanel: GridPanel,
                    angularGrid: Grid, filterManager: FilterManager, $scope: any, $compile: any) {
            this.gridOptionsWrapper = gridOptionsWrapper;
            this.columnController = columnController;
            this.angularGrid = angularGrid;
            this.filterManager = filterManager;
            this.$scope = $scope;
            this.$compile = $compile;
            this.findAllElements(gridPanel);
        }

        private findAllElements(gridPanel: GridPanel) {
            this.ePinnedHeader = gridPanel.getPinnedHeader();
            this.ePinnedRightHeader = gridPanel.getPinnedRightHeader();
            this.eHeaderContainer = gridPanel.getHeaderContainer();
            this.eRoot = gridPanel.getRoot();
        }

        public refreshHeader() {
            utils.removeAllChildren(this.ePinnedHeader);
            utils.removeAllChildren(this.ePinnedRightHeader);
            utils.removeAllChildren(this.eHeaderContainer);

            this.headerElements.forEach( (headerElement: RenderedHeaderElement) => {
                headerElement.destroy();
            });
            this.headerElements = [];

            if (this.gridOptionsWrapper.isGroupHeaders()) {
                this.insertHeadersWithGrouping();
            } else {
                this.insertHeadersWithoutGrouping();
            }
        }

        private getColumnGroupContainer(columnGroup: ColumnGroup) {
            if (columnGroup.pinnedLeft) {
                return this.ePinnedHeader;
            } else if (columnGroup.pinnedRight) {
                return this.ePinnedRightHeader;
            }
            return this.eHeaderContainer;
        }

        private insertHeadersWithGrouping() {
            var groups: ColumnGroup[] = this.columnController.getHeaderGroups();
            groups.forEach( (columnGroup: ColumnGroup, index: number) => {
                var renderedHeaderGroup = new RenderedHeaderGroupCell(columnGroup, this.gridOptionsWrapper,
                    this.columnController, this.eRoot, this.angularGrid, this.$scope,
                    this.filterManager, this.$compile);
                this.headerElements.push(renderedHeaderGroup);
                var eContainerToAddTo = this.getColumnGroupContainer(columnGroup);
                eContainerToAddTo.appendChild(renderedHeaderGroup.getGui());
            });
        }

        private getColumnContainer(column: Column) {
            if (column.pinnedLeft) {
                return this.ePinnedHeader;
            } else if (column.pinnedRight) {
                return this.ePinnedRightHeader;
            }
            return this.eHeaderContainer;
        }

        private insertHeadersWithoutGrouping() {
            this.columnController.getDisplayedColumns().forEach( (column: Column, index: number) => {
                // only include the first x cols
                var renderedHeaderCell = new RenderedHeaderCell(column, null, this.gridOptionsWrapper,
                    this.$scope, this.filterManager, this.columnController, this.$compile,
                    this.angularGrid, this.eRoot);
                this.headerElements.push(renderedHeaderCell);
                var eContainerToAddTo = this.getColumnContainer(column);
                eContainerToAddTo.appendChild(renderedHeaderCell.getGui());
            });
        }

        public updateSortIcons() {
            this.headerElements.forEach( (headerElement: RenderedHeaderElement) => {
                headerElement.refreshSortIcon();
            });
        }

        public updateFilterIcons() {
            this.headerElements.forEach( (headerElement: RenderedHeaderElement) => {
                headerElement.refreshFilterIcon();
            });
        }

        public onIndividualColumnResized(column: Column): void {
            this.headerElements.forEach( (headerElement: RenderedHeaderElement) => {
                headerElement.onIndividualColumnResized(column);
            });
        }
    }
}
