import { ICompileProvider, ILocationProvider, module, route } from 'angular';
import ngRoute from 'angular-route';
import { componentName as GenerateComponentName, GenerateComponent } from './components/generate/generate.component';
import { componentName as ScanComponentName, ScanComponent } from './components/scan/scan.component';
import './style.css';

module('SampleApp', [ngRoute])
    .component(ScanComponentName, new ScanComponent())
    .component(GenerateComponentName, new GenerateComponent())
    .config(
        (
            $routeProvider: route.IRouteProvider,
            $locationProvider: ILocationProvider,
            $compileProvider: ICompileProvider
        ) => {
            $locationProvider.hashPrefix('');
            $routeProvider
                .when('/scan', { template: '<scan></scan>' })
                .when('/generate', { template: '<generate></generate>' })
                .otherwise('/scan');

            $compileProvider.debugInfoEnabled(false);
            $compileProvider.commentDirectivesEnabled(false);
            $compileProvider.cssClassDirectivesEnabled(false);
        }
    )
    .run(() => {});
