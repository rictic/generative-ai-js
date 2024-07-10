/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { findFunctions, samplesDir } from './common.js';
import fs from "fs";
import { join } from "path";

async function insertImportComments() {
  const files = fs.readdirSync(samplesDir);
  for (const filename of files) {
    if (filename.match(/.+\.js$/) && !filename.includes('-')) {
      const file = fs.readFileSync(join(samplesDir, filename), 'utf-8');
      const functions = findFunctions(file);
      for (const fnName in functions) {
        const sampleFn = functions[fnName];
        for (const line of sampleFn.body) {
          if (line.includes('GoogleAIFileManager')) {
            console.log(fnName);
          }
        }
      }
    }
  }
}

insertImportComments();