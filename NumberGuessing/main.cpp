#include <iostream>
#include <cstdlib>  // rand(), srand()
#include <ctime>    // time()
using namespace std;

int main() {
	srand(time(0)); // 랜덤 시드 설정
	int target = rand() % 100 + 1; // 1~100 사이의 랜덤 숫자 생성
	int guess = 0;
	int attempts = 0; // 시도 횟수

	cout << "🔢 숫자 맞추기 게임을 시작합니다!" << endl;
	cout << "1부터 100 사이의 숫자를 맞춰보세요!" << endl;

    while (guess != target) {
        cout << "입력: ";
        cin >> guess;
        attempts++;

        if (guess < target) {
            cout << "⬆ 더 높게!" << endl;
        } else if (guess > target) {
            cout << "⬇ 더 낮게!" << endl;
        } else {
            cout << "🎉 정답입니다! (" << attempts << "번 시도)" << endl;
        }
    }

    return 0;
}