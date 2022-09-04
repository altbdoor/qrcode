#!/bin/bash

CURRENT_DIR=$( cd "$(dirname "${BASH_SOURCE}")" ; pwd -P )
cd "$CURRENT_DIR"

cd ../src/components

file_name="$1"

if [[ ! -e "${file_name}" ]]; then
    mkdir "${file_name}"
fi

cd "${file_name}"
echo "<div>Hello ${file_name}</div>" > "${file_name}.component.html"

class_name=$(echo "${file_name}" | sed -r 's/(^|-)([a-z])/\U\2/g')
component_name=$(echo "${class_name,}")

cat <<EOT > "${file_name}.component.ts"
// for use in importing
// import {
//     componentName as ${class_name}ComponentName,
//     ${class_name}Component
// } from './components/${file_name}/${file_name}.component';
// .component(${class_name}ComponentName, new ${class_name}Component())

import { IComponentController, IComponentOptions } from 'angular';
import template from './${file_name}.component.html?raw';

class ${class_name}Controller implements IComponentController {
    static \$inject = [];

    \$onInit() {}
}

export class ${class_name}Component implements IComponentOptions {
    controller = ${class_name}Controller;
    template = template;
}

export const componentName = '${component_name}';
EOT
