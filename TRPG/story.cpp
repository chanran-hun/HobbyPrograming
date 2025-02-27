#include <iostream>
#include <windows.h> 

using namespace std;

class Town {
public:
    void enter() {
        int choice;
        while (true) {
            cout << "\n====================================\n";
            cout << "       🏡 마을에 도착했습니다!       \n";
            cout << "====================================\n";
            cout << "1. NPC와 대화하기\n";
            cout << "2. 상점 방문\n";
            cout << "3. 휴식 (HP 회복)\n";
            cout << "4. 마을을 떠나기\n";
            cout << "선택: ";
            cin >> choice;

            if (choice == 1) {
                talkToNPC();
            } else if (choice == 2) {
                visitShop();
            } else if (choice == 3) {
                rest();
            } else if (choice == 4) {
                cout << "마을을 떠납니다...\n";
                break;
            } else {
                cout << "잘못된 입력입니다.\n";
            }
        }
    }

    void talkToNPC() {
        cout << "\n👴 마을 촌장: '요즘 숲에서 몬스터가 자주 나타나는군... 조심하게나!'\n";
    }

    void visitShop() {
        cout << "\n🛒 상점 주인: '어서 오세요! 하지만 지금은 재고가 없어요.'\n";
    }

    void rest() {
        cout << "\n💤 당신은 마을에서 휴식을 취하고 HP를 회복했습니다.\n";
    }
};

int main() {
    Town town;
    town.enter();
    return 0;
}
