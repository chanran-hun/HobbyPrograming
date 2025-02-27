#include <iostream>
#include <cstdlib>
#include <ctime>

using namespace std;

// 캐릭터(플레이어) 클래스
class Character {
public:
    string name;
    int hp, maxHp, atk, level, exp, expToNextLevel;

    Character(string n, int h, int a) {
        name = n;
        maxHp = h;
        hp = h;
        atk = a;
        level = 1;
        exp = 0;
        expToNextLevel = 10; // 기본 경험치 요구량
    }

    void takeDamage(int damage) {
        hp -= damage;
        if (hp < 0) hp = 0;
    }

    bool isAlive() {
        return hp > 0;
    }

    void gainExp(int amount) {
        exp += amount;
        cout << name << "이(가) " << amount << " 경험치를 얻었습니다! (현재 경험치: " << exp << "/" << expToNextLevel << ")\n";
        checkLevelUp();
    }

    void checkLevelUp() {
        while (exp >= expToNextLevel) {
            level++;
            exp -= expToNextLevel;
            expToNextLevel += 5;
            maxHp += 5;
            atk += 2;
            hp = maxHp;  // 레벨업 시 체력 회복
            cout << "레벨 업!" << name << "이(가) 레벨 " << level << "이 되었습니다!HP: " << maxHp << ", ATK : " << atk << "\n";
        }
    }
};

// 몬스터 클래스
class Monster {
public:
    string name;
    int hp, atk, expReward;

    Monster(string n, int h, int a, int exp) {
        name = n;
        hp = h;
        atk = a;
        expReward = exp;
    }

    void takeDamage(int damage) {
        hp -= damage;
        if (hp < 0) hp = 0;
    }

    bool isAlive() {
        return hp > 0;
    }
};

// 전투 시스템 클래스
class Battle {
public:
    static void start(Character& player, Monster& monster) {
        cout << monster.name << "이(가) 나타났다! (HP: " << monster.hp << ", ATK: " << monster.atk << ")\n";

        bool playerDefending = false; // 방어 상태 여부

        while (player.isAlive() && monster.isAlive()) {
            cout << player.name << "의 턴! (내 HP: " << player.hp << "/" << player.maxHp << ", 상대 HP: " << monster.hp << ")\n";
            cout << "1. 공격  2. 방어  3. 도망가기\n";
            int choice;
            cin >> choice;

            if (choice == 1) {
                // 크리티컬 확률 (20%)
                bool isCritical = (rand() % 100) < 20;
                int damage = isCritical ? player.atk * 1.5 : player.atk;

                monster.takeDamage(damage);
                cout << player.name << "이(가) " << monster.name << "에게 " << damage << "의 피해를 입혔다!";
                if (isCritical) cout << " (크리티컬 히트!)";
                cout << "\n";

                if (!monster.isAlive()) {
                    cout << monster.name << "을(를) 쓰러뜨렸다!\n";
                    player.gainExp(monster.expReward);
                    return;
                }

            } else if (choice == 2) {
                playerDefending = true;
                cout << player.name << "이(가) 방어 태세를 취합니다. (다음 턴 받는 피해 50% 감소)\n";
            } else if (choice == 3) {
                int escapeChance = rand() % 100; // 0~99 사이 랜덤 값
                if (escapeChance < 50) { // 50% 확률로 도망 성공
                    cout << player.name << "이(가) 도망쳤습니다!\n";
                    return;
                } else {
                    cout << player.name << "이(가) 도망치려 했으나 실패했습니다!\n";
                }
            }

            // 몬스터의 공격
            cout << monster.name << "의 턴!\n";

            // 회피 확률 (15%)
            bool isEvaded = (rand() % 100) < 15;
            if (isEvaded) {
                cout << player.name << "이(가) 몬스터의 공격을 회피했습니다! \n";
            } else {
                int damage = monster.atk;
                if (playerDefending) {
                    damage /= 2; // 방어 시 데미지 절반 감소
                    playerDefending = false;
                }
                player.takeDamage(damage);
                cout << monster.name << "이(가) " << player.name << "에게 " << damage << "의 피해를 입혔다!\n";
            }
        }

        if (!player.isAlive()) {
            cout << player.name << "이(가) 쓰러졌습니다... 게임 오버!\n";
        }
    }
};

int main() {
    srand(time(0));

    Character player("용사", 20, 5);

    while (player.isAlive()) {
        // 새로운 몬스터 생성 (레벨이 올라갈수록 강해짐)
        int newHp = 15 + rand() % 10 + player.level * 5;
        int newAtk = 3 + rand() % 5 + player.level * 2;
        int expReward = 4 + rand() % 6 + player.level;

        Monster monster("몬스터", newHp, newAtk, expReward);

        Battle::start(player, monster);
        if (!player.isAlive()) break;

        cout << "다음 전투를 하시겠습니까? (1. 계속 / 2. 종료): ";
        int next;
        cin >> next;
        if (next != 1) break;
    }

    cout << "게임을 종료합니다.\n";
    return 0;
}
