import { IComponentController, IComponentOptions } from 'angular';
import template from './generate.component.html?raw';

class GenerateController implements IComponentController {
    static $inject = [];

    $onInit() {
        import('@zxing/library/esm/browser/BrowserQRCodeSvgWriter').then((lib) => {
            console.log(lib);
        });
    }
}

export class GenerateComponent implements IComponentOptions {
    controller = GenerateController;
    template = template;
}

export const componentName = 'generate';
