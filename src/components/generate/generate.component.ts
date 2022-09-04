import { IComponentController, IComponentOptions } from 'angular';
import template from './generate.component.html?raw';

class GenerateController implements IComponentController {
    static $inject = [];

    $onInit() {}
}

export class GenerateComponent implements IComponentOptions {
    controller = GenerateController;
    template = template;
}

export const componentName = 'generate';
