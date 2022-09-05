import { BrowserQRCodeReader } from '@zxing/library/esm/browser/BrowserQRCodeReader';
import { element, IComponentController, IComponentOptions, IScope } from 'angular';
import template from './scan.component.html?raw';

class ScanController implements IComponentController {
    static $inject = ['$scope'];

    reader: BrowserQRCodeReader | undefined;
    devices: MediaDeviceInfo[] = [];
    activeDevice = '';

    videoId = 'scan-video-0';
    lastUpdated = new Date();

    constructor(private $scope: IScope) {}

    $onInit() {
        import('@zxing/library/esm/browser/BrowserQRCodeReader').then((lib) => {
            this.reader = new lib.BrowserQRCodeReader(1000);
            this.reloadDevices();
        });
    }

    reloadDevices() {
        this.reader!.listVideoInputDevices().then((devices) => {
            this.devices = devices;
            this.$scope.$apply();

            if (devices.length === 1) {
                this.activeDevice = devices[0].deviceId;
                this.startScan(devices[0].deviceId);
                this.$scope.$apply();
            }
        });
    }

    startScan(deviceId: string) {
        this.reader!.stopContinuousDecode();
        this.reader!.decodeFromVideoDevice(deviceId, this.videoId, (res) => {
            if (!res) {
                return;
            }

            const textarea = element(document.querySelector<HTMLTextAreaElement>('.app-scan__result')!);
            if (textarea.val() !== res.getText()) {
                textarea.val(res.getText());
                this.lastUpdated = new Date();
                this.$scope.$apply();
            }
        });
    }

    stopScan() {
        const video = document.querySelector<HTMLVideoElement>(`#${this.videoId}`)!;
        this.reader!.stopContinuousDecode();
        video.pause();
        video.currentTime = 0;
    }

    copyText() {
        const textarea = document.querySelector<HTMLTextAreaElement>('.app-scan__result')!;
        textarea.select();
        textarea.setSelectionRange(0, Number.MAX_SAFE_INTEGER);
        window.navigator.clipboard.writeText(textarea.value);
    }
}

export class ScanComponent implements IComponentOptions {
    controller = ScanController;
    template = template;
}

export const componentName = 'scan';
