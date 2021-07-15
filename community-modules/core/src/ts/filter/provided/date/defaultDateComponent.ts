import { AgInputTextField } from '../../../widgets/agInputTextField';
import { Component } from '../../../widgets/component';
import { IDateComp, IDateParams } from '../../../rendering/dateComponent';
import { RefSelector } from '../../../widgets/componentAnnotations';
import { serialiseDate, parseDateTimeFromString } from '../../../utils/date';
import { isBrowserChrome, isBrowserFirefox, isBrowserIE } from '../../../utils/browser';
import { IAfterGuiAttachedParams } from '../../../interfaces/iAfterGuiAttachedParams';

export class DefaultDateComponent extends Component implements IDateComp {
    @RefSelector('eDateInput') private readonly eDateInput: AgInputTextField;

    constructor() {
        super(/* html */`
            <div class="ag-filter-filter">
                <ag-input-text-field class="ag-date-filter" ref="eDateInput"></ag-input-text-field>
            </div>`
        );
    }

    // this is a user component, and IComponent has "public destroy()" as part of the interface.
    // so we need to override destroy() just to make the method public.
    public destroy(): void {
        super.destroy();
    }

    public init(params: IDateParams): void {
        const inputElement = this.eDateInput.getInputElement();

        if (this.shouldUseBrowserDatePicker(params)) {
            if (isBrowserIE()) {
                console.warn('ag-grid: browserDatePicker is specified to true, but it is not supported in IE 11; reverting to text date picker');
            } else {
                inputElement.type = 'date';
            }
        }

        // ensures that the input element is focussed when a clear button is clicked
        this.addManagedListener(inputElement, 'mousedown', () => inputElement.focus());

        this.addManagedListener(this.eDateInput.getInputElement(), 'input', e => {
            if (e.target !== e.target.getRootNode().activeElement) { return; }

            params.onDateChanged();
        });
    }

    public getDate(): Date | null {
        return parseDateTimeFromString(this.eDateInput.getValue());
    }

    public setDate(date: Date): void {
        this.eDateInput.setValue(serialiseDate(date, false));
    }

    public setInputPlaceholder(placeholder: string): void {
        this.eDateInput.setInputPlaceholder(placeholder);
    }

    public afterGuiAttached(params?: IAfterGuiAttachedParams): void {
        if (!params || !params.suppressFocus) {
            this.eDateInput.getInputElement().focus();
        }
    }

    private shouldUseBrowserDatePicker(params: IDateParams): boolean {
        if (params.filterParams && params.filterParams.browserDatePicker != null) {
            return params.filterParams.browserDatePicker;
        }

        return isBrowserChrome() || isBrowserFirefox();
    }
}
