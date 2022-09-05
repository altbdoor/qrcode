import { BrowserQRCodeSvgWriter } from '@zxing/library/esm/browser/BrowserQRCodeSvgWriter';
import { IComponentController, IComponentOptions, IScope } from 'angular';
import template from './generate.component.html?raw';

class GenerateController implements IComponentController {
    static $inject = ['$scope'];

    blobUrl = '';
    qrText = '';
    asciiWorker: Worker | undefined;
    lastWorkerTimestamp = 0;

    writer: BrowserQRCodeSvgWriter | undefined;
    formModel = {
        inputText: '',
        size: 1080,
        bgColor: '#fff',
        qrColor: '#000',
        mode: 'image',
    };

    constructor(private $scope: IScope) {}

    $onInit() {
        import('@zxing/library/esm/browser/BrowserQRCodeSvgWriter').then((lib) => {
            this.writer = new lib.BrowserQRCodeSvgWriter();
        });

        this.asciiWorker = new Worker(new URL('./ascii.worker.js', import.meta.url));
        this.asciiWorker.addEventListener('message', (evt: MessageEvent<{ qrText: string; timestamp: number }>) => {
            if (evt.data.timestamp !== this.lastWorkerTimestamp) {
                return;
            }

            if (evt.data.qrText === this.qrText) {
                return;
            }

            this.qrText = evt.data.qrText;
            this.$scope.$apply();
        });
    }

    $onDestroy(): void {
        this.asciiWorker?.terminate();
    }

    textChange(formModel: typeof this.formModel) {
        if (!formModel.inputText) {
            return;
        }

        if (this.blobUrl) {
            URL.revokeObjectURL(this.blobUrl);
        }

        const svgElem = this.writer!.write(formModel.inputText, formModel.size, formModel.size);

        if (formModel.mode === 'image') {
            svgElem.setAttribute('viewBox', `0 0 ${formModel.size} ${formModel.size}`);
            svgElem.innerHTML = [
                `<rect width="100%" height="100%" fill="${formModel.bgColor}"></rect>`,
                svgElem.innerHTML,
            ].join('');

            // svgElem.querySelectorAll('rect[fill]').forEach((elem, idx) => {
            //     if (idx === 0) {
            //         return;
            //     }

            //     elem.setAttribute('fill', formModel.qrColor);
            // });

            const data = new XMLSerializer().serializeToString(svgElem);
            const blob = new Blob([data], { type: 'image/svg+xml; charset=utf-8' });
            this.blobUrl = URL.createObjectURL(blob);
        } else {
            this.lastWorkerTimestamp = Date.now();
            this.asciiWorker!.postMessage({ svgString: svgElem.innerHTML, timestamp: this.lastWorkerTimestamp });
        }
    }

    copyText(qrText: string) {
        window.navigator.clipboard.writeText(qrText);
    }
}

export class GenerateComponent implements IComponentOptions {
    controller = GenerateController;
    template = template;
}

export const componentName = 'generate';
