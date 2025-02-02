"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAudioStreamFromText = exports.createAudioFileFromText = void 0;
var dotenv = require("dotenv");
var elevenlabs_1 = require("elevenlabs");
var fs_1 = require("fs");
var uuid_1 = require("uuid");
dotenv.config();
var ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
var client = new elevenlabs_1.ElevenLabsClient({
    apiKey: ELEVENLABS_API_KEY,
});
var createAudioFileFromText = function (text) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
                var audio, fileName_1, fileStream, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, client.generate({
                                    voice: 'Rachel',
                                    model_id: 'eleven_turbo_v2_5',
                                    text: text,
                                })];
                        case 1:
                            audio = _a.sent();
                            fileName_1 = "".concat((0, uuid_1.v4)(), ".mp3");
                            fileStream = (0, fs_1.createWriteStream)(fileName_1);
                            audio.pipe(fileStream);
                            fileStream.on('finish', function () { return resolve(fileName_1); }); // Resolve with the fileName
                            fileStream.on('error', reject);
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            reject(error_1);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); })];
    });
}); };
exports.createAudioFileFromText = createAudioFileFromText;
var createAudioStreamFromText = function (text) { return __awaiter(void 0, void 0, void 0, function () {
    var audioStream, chunks, _a, audioStream_1, audioStream_1_1, chunk, e_1_1, content;
    var _b, e_1, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0: return [4 /*yield*/, client.generate({
                    voice: 'Rachel',
                    model_id: 'eleven_turbo_v2_5',
                    text: text,
                })];
            case 1:
                audioStream = _e.sent();
                chunks = [];
                _e.label = 2;
            case 2:
                _e.trys.push([2, 7, 8, 13]);
                _a = true, audioStream_1 = __asyncValues(audioStream);
                _e.label = 3;
            case 3: return [4 /*yield*/, audioStream_1.next()];
            case 4:
                if (!(audioStream_1_1 = _e.sent(), _b = audioStream_1_1.done, !_b)) return [3 /*break*/, 6];
                _d = audioStream_1_1.value;
                _a = false;
                chunk = _d;
                chunks.push(chunk);
                _e.label = 5;
            case 5:
                _a = true;
                return [3 /*break*/, 3];
            case 6: return [3 /*break*/, 13];
            case 7:
                e_1_1 = _e.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 13];
            case 8:
                _e.trys.push([8, , 11, 12]);
                if (!(!_a && !_b && (_c = audioStream_1.return))) return [3 /*break*/, 10];
                return [4 /*yield*/, _c.call(audioStream_1)];
            case 9:
                _e.sent();
                _e.label = 10;
            case 10: return [3 /*break*/, 12];
            case 11:
                if (e_1) throw e_1.error;
                return [7 /*endfinally*/];
            case 12: return [7 /*endfinally*/];
            case 13:
                content = Buffer.concat(chunks);
                return [2 /*return*/, content];
        }
    });
}); };
exports.createAudioStreamFromText = createAudioStreamFromText;
// Main function to call the methods
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var audioFile, audioStream, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, (0, exports.createAudioFileFromText)('जय श्री राम')];
                case 1:
                    audioFile = _a.sent();
                    console.log('Audio file created:', audioFile);
                    return [4 /*yield*/, (0, exports.createAudioStreamFromText)('This is James')];
                case 2:
                    audioStream = _a.sent();
                    console.log('Audio stream created with length:', audioStream.length);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error('Error:', error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
main(); // Call the main function

// Example usage in a component or page
createAudioFileFromText('Hello World').then((fileName) => {
  console.log('Audio file created:', fileName);
});

createAudioStreamFromText('Hello World').then((audioStream) => {
  console.log('Audio stream created with length:', audioStream.length);
});
