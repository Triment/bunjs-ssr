// declare global {
//   interface Window {
//     __URQL_DATA__: object
//   }
// }
// declare global {
//   window.__URQL_DATA__ = object
// }

// interface Window {
//     __URQL_DATA__: object
//     prototype: Window
// }

// declare const window: Window
export {}
declare global {
  interface Window {
    CTX_STATE: any
  }
  interface BigInt {
    toJSON: () => number
    fromJSON: () => bigint
  }
  interface Date {
    toGMTString: () => string
  }
}
// declare const Window: {
//     new (): Window;
//     prototype: Window;
//     __URQL_DATA__: object;
// }

// declare const window: Window

// declare global {
//     interface Window {
//         __URQL_DATA__: object
//     }
// }
