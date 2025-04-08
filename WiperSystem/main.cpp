#include <iostream>
using namespace std;

class Coating {
	//�⺻������ �ڵ����� ������ �߼� ������ �Ǿ��ִ�.
public:
	void apply() {
		cout << "�߼� ������ ����Ǿ����ϴ�" << endl;
	}
};

class RainSensor {
	//���� ���� �����ϴ� ����
public:
	int getRainLevel() {
		//0:�������� 1:�̷� 2:���� 3:����
		return 2;
	}
};

class TemperatureSensor {
	//�µ��� �����ϴ� ����
public:
	int getTemperature() {
		//�����µ� ��ȯ
		return -2;
	}
};

class Heater {
	//������ ����
public:
	void activate() {
		cout << "���Ͱ� �����մϴ�(â�� ��� ����)" << endl;
	}
};

class WyperSystem {
	//������ ��ü�� ����
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
			cout << "�۵�����" << endl;
		} else if (rain == 1) {
			cout << "�۵� : 1�ܰ�" << endl;
		} else if (rain == 2) {
			cout << "�۵� : 2�ܰ�" << endl;
		} else if (rain == 3) {
			cout << "�۵� : 3�ܰ�" << endl;
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
