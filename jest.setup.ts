import '@testing-library/jest-dom';
import '@testing-library/jest-dom/jest-globals';
import { TextEncoder } from 'util';

global.TextEncoder = TextEncoder;
// global.TextDecoder = TextDecoder;
