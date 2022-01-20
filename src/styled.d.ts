import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
  }
}

// styled-components를 import 하고 styled components의 테마 정의를 확장하는 것.
