import tensorflow as tf
from tensorflow import keras
import numpy as np
import matplotlib.pyplot as plt

# MNIST 데이터셋 로드
mnist = keras.datasets.mnist
(x_train, y_train), (x_test, y_test) = mnist.load_data()

# 데이터 정규화 (0~255 범위를 0~1로 변경)
x_train, x_test = x_train / 255.0, x_test / 255.0

# 간단한 신경망 모델 생성
model = keras.Sequential([
    keras.layers.Flatten(input_shape=(28, 28)),  # 28x28 이미지를 1차원 벡터로 변환
    keras.layers.Dense(128, activation='relu'),  # 은닉층 (ReLU 활성화 함수)
    keras.layers.Dense(10, activation='softmax') # 출력층 (0~9 클래스 분류)
])

# 모델 컴파일
model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

# 모델 학습
model.fit(x_train, y_train, epochs=5)

# 테스트 데이터로 정확도 평가
test_loss, test_acc = model.evaluate(x_test, y_test)
print(f"테스트 정확도: {test_acc:.4f}")

# 예측 테스트 (첫 번째 숫자)
predictions = model.predict(np.expand_dims(x_test[0], axis=0))
predicted_label = np.argmax(predictions)

# 결과 출력
plt.imshow(x_test[0], cmap='gray')
plt.show()
print(f"모델이 예측한 숫자: {predicted_label}")
