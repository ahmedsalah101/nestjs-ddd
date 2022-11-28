//https://stackoverflow.com/questions/13955157/how-to-define-static-property-in-typescript-interface
/**
 * @desc takes an interface that its props should be static in decorated class
 */
export function staticImplements<T>() {
  return <U extends T>(constructor: U) => {
    constructor;
  };
}

// interface s {
//   r():string;
//    sea():void;
// }

// class sl {
//    static r() {}
//    static sea(){}
// }
// console.log(staticImplements<s>()(sl));
