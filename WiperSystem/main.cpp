#include <iostream>
using namespace std;

class Coating {
	//기본적으로 자동차는 앞유리 발수 코팅이 되어있다.
public:
	void apply() {
		cout << "발수 코팅이 적용되었습니다" << endl;
	}
};

class RainSensor {
	//비의 양을 감지하는 센서
public:
	int getRainLevel() {
		//0:강수없음 1:미량 2:보통 3:강력
		return 2;
	}
};

class TemperatureSensor {
	//온도를 감지하는 센서
public:
	int getTemperature() {
		//섭씨온도 반환
		return -2;
	}
};

class Heater {
	//히터의 동작
public:
	void activate() {
		cout << "히터가 동작합니다(창문 결빙 방지)" << endl;
	}
};

class WyperSystem {
	//와이퍼 전체의 동작
private:
	Coating coating;
	RainSensor sensor;
	TemperatureSensor tempSensor;
	Heater heater;

public:
	void initialize() {
		coating.apply();
	}

	void update() {
		int rain = sensor.getRainLevel();
		int temp = tempSensor.getTemperature();

		if (rain == 0) {
			cout << "작동안함" << endl;
		} else if (rain == 1) {
			cout << "작동 : 1단계" << endl;
		} else if (rain == 2) {
			cout << "작동 : 2단계" << endl;
		} else if (rain == 3) {
			cout << "작동 : 3단계" << endl;
		}

		if (temp < 0) {
			heater.activate();
		}
	}
};

int main() {
	WyperSystem system;
	system.initialize();
	system.update();

	return 0;
}
