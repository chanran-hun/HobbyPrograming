#include <iostream>
using namespace std;

class Coating {
//�⺻������ �ڵ����� ������ �߼� ������ �Ǿ��ִ�.
public:
	void apply() {
		cout << "�߼� ������ ����Ǿ����ϴ�" << endl;
	}
};

class Sensor {
//���� ���� �����ϴ� ����
public:
	int getRainLevel() {
	//0:�������� 1:�̷� 2:���� 3:����
		return 2;
	}
};


class WyperSystem {
	//������ ��ü�� ����
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
			cout << "�۵�����" << endl;
		} else if(rain == 1){
			cout << "�۵� : 1�ܰ�" << endl;
		} else if (rain == 2) {
			cout << "�۵� : 2�ܰ�" << endl;
		} else if (rain == 3) {
			cout << "�۵� : 3�ܰ�" << endl;
		}
	}
};

int main() {
	WyperSystem system;
	system.initialize();
	system.update();

	return 0;
}
