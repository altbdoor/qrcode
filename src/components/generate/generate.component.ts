import { BrowserQRCodeSvgWriter } from '@zxing/library/esm/browser/BrowserQRCodeSvgWriter';
import { IComponentController, IComponentOptions } from 'angular';
import template from './generate.component.html?raw';

class GenerateController implements IComponentController {
    static $inject = [];

    blobUrl = '';
    writer: BrowserQRCodeSvgWriter | undefined;
    formModel = {
        inputText: '',
        size: 1080,
        bgColor: '#fff',
        qrColor: '#000',
    };

    $onInit() {
        import('@zxing/library/esm/browser/BrowserQRCodeSvgWriter').then((lib) => {
            this.writer = new lib.BrowserQRCodeSvgWriter();
        });
    }

    textChange(formModel: typeof this.formModel) {
        if (!formModel.inputText) {
            return;
        }

        if (this.blobUrl) {
            URL.revokeObjectURL(this.blobUrl);
        }

        const svgElem = this.writer!.write(formModel.inputText, formModel.size, formModel.size);
        svgElem.setAttribute('viewBox', `0 0 ${formModel.size} ${formModel.size}`);
        svgElem.innerHTML = [
            `<rect width="100%" height="100%" fill="${formModel.bgColor}"></rect>`,
            svgElem.innerHTML,
        ].join('');

        svgElem.querySelectorAll('rect[fill]').forEach((elem, idx) => {
            if (idx === 0) {
                return;
            }

            elem.setAttribute('fill', formModel.qrColor);
        });

        const data = new XMLSerializer().serializeToString(svgElem);
        const blob = new Blob([data], { type: 'image/svg+xml; charset=utf-8' });
        this.blobUrl = URL.createObjectURL(blob);
    }
}

export class GenerateComponent implements IComponentOptions {
    controller = GenerateController;
    template = template;
}

export const componentName = 'generate';
