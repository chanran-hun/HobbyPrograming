document.getElementById("generateBtn").addEventListener("click", function() {
    let qrText = document.getElementById("qrText").value;
    let qrCodeDiv = document.getElementById("qrCode");

    // 기존 QR 코드 삭제 (새로 만들 때 덮어쓰기)
    qrCodeDiv.innerHTML = "";

    if (qrText.trim() !== "") {
        new QRCode(qrCodeDiv, {
            text: qrText,
            width: 200,
            height: 200
        });
    } else {
        alert("텍스트를 입력해주세요!");
    }
});