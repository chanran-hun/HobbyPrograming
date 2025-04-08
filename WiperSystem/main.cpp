#include <iostream>
using namespace std;

class Coating {
//기본적으로 자동차는 앞유리 발수 코팅이 되어있다.
public:
	void apply() {
		cout << "발수 코팅이 적용되었습니다" << endl;
	}
};

class Sensor {
//비의 양을 감지하는 센서
public:
	int getRainLevel() {
	//0:강수없음 1:미량 2:보통 3:강력
		return 2;
	}
};


class WyperSystem {
	//와이퍼 전체의 동작
private:
	Coating coating;
	Sensor sensor;

public:
	void initialize() {
		coating.apply();
	}

	void update() {
		int rain = sensor.getRainLevel();

		if (rain == 0) {
			cout << "작동안함" << endl;
		} else if(rain == 1){
			cout << "작동 : 1단계" << endl;
		} else if (rain == 2) {
			cout << "작동 : 2단계" << endl;
		} else if (rain == 3) {
			cout << "작동 : 3단계" << endl;
		}
	}
};

int main() {
	WyperSystem system;
	system.initialize();
	system.update();

	return 0;
}
