# js.validator
IIFE 를 이용한 값 validator. try-catch로 처리 허접하기 그지없음 ㅠ
누가 더 좋은 패턴 좀 알려주세요.

# 사용예
```
<script src="validator.js"></script>
```

```
try {
    V(null).required('없나요?').result();
    V(123124124).required('없나요?').result();
    V('dap').required('없나요?').result();
    V('dap').required('없나요?').minlength(4,'짧네.').result();
    // 통과했다. 가자 다음 단계로...
} catch(e) {
    console.log(e);
}
```

# License
누구나 10분이면 만드는 것 라이센스라니..막 쓰기;;;
