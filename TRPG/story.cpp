#include <iostream>

using namespace std;

class Quest {
public:
    string description;  // 퀘스트 설명
    int requiredKills;   // 필요 처치 수
    int currentKills;    // 현재 처치 수
    bool isCompleted;    // 완료 여부

    Quest(string desc, int kills) {
        description = desc;
        requiredKills = kills;
        currentKills = 0;
        isCompleted = false;
    }

    void addKill() {
        if (!isCompleted) {
            currentKills++;
            cout << "퀘스트 진행: " << currentKills << "/" << requiredKills << " 처치 완료!\n";
            if (currentKills >= requiredKills) {
                isCompleted = true;
                cout << "퀘스트 완료! NPC에게 보고하세요.\n";
            }
        }
    }

    bool checkCompletion() {
        return isCompleted;
    }
};

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

// 플레이어 클래스
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
        expToNextLevel = 10;
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
            hp = maxHp;
            cout << "레벨 업! " << name << "이(가) 레벨 " << level << "이 되었습니다! (HP: " << maxHp << ", ATK: " << atk << ")\n";
        }
    }
};

// 마을 시스템 (퀘스트 관리 포함)
class Town {
public:
    bool hasActiveQuest = false;
    Quest* activeQuest = nullptr;

    void enter() {
        int choice;
        while (true) {
            cout << "\n====================================\n";
            cout << "       🏡 마을에 도착했습니다!       \n";
            cout << "====================================\n";
            cout << "1. NPC와 대화하기 (퀘스트)\n";
            cout << "2. 마을을 떠나기\n";
            cout << "선택: ";
            cin >> choice;

            if (choice == 1) {
                talkToNPC();
            } else if (choice == 2) {
                cout << "마을을 떠납니다...\n";
                break;
            } else {
                cout << "잘못된 입력입니다.\n";
            }
        }
    }

    void talkToNPC() {
        if (!hasActiveQuest) {
            cout << "\n👴 마을 촌장: '숲에서 몬스터가 많아지고 있다네. 도와주겠나?'\n";
            cout << "📜 새로운 퀘스트: '숲의 늑대 3마리 처치'\n";
            activeQuest = new Quest("숲의 늑대 3마리 처치", 3);
            hasActiveQuest = true;
        } else if (activeQuest->checkCompletion()) {
            cout << "\n👴 마을 촌장: '고맙네! 마을이 한결 안전해졌어.'\n";
            cout << "🎉 보상: 100골드\n";
            hasActiveQuest = false;
            delete activeQuest;
            activeQuest = nullptr;
        } else {
            cout << "\n👴 마을 촌장: '아직 몬스터가 남아 있다네. 조심하게!'\n";
        }
    }
};
class Battle {
public:
    static void start(Character& player, Monster& monster, Town& town) {
        cout << monster.name << "이(가) 나타났다! (HP: " << monster.hp << ", ATK: " << monster.atk << ")\n";

        while (player.isAlive() && monster.isAlive()) {
            cout << player.name << "의 턴! (내 HP: " << player.hp << "/" << player.maxHp << ")\n";
            cout << "(상대 HP: " << monster.hp << ")\n";
            cout << "1. 공격  2. 도망가기\n";
            int choice;
            cin >> choice;

            if (choice == 1) {
                monster.takeDamage(player.atk);
                cout << player.name << "이(가) " << monster.name << "에게 " << player.atk << "의 피해를 입혔다!\n";

                if (!monster.isAlive()) {
                    cout << monster.name << "을(를) 쓰러뜨렸다!\n";
                    player.gainExp(monster.expReward);

                    // 퀘스트 진행도 추가
                    if (town.hasActiveQuest && town.activeQuest != nullptr) {
                        town.activeQuest->addKill();
                    }
                    return;
                }

                player.takeDamage(monster.atk);
                cout << monster.name << "이(가) " << player.name << "에게 " << monster.atk << "의 피해를 입혔다!\n";

            } else if (choice == 2) {
                cout << player.name << "이(가) 도망쳤습니다!\n";
                return;
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
    Town town;

    while (player.isAlive()) {
        town.enter();

        int newHp = 15 + rand() % 10 + player.level * 5;
        int newAtk = 3 + rand() % 5 + player.level * 2;
        int expReward = 4 + rand() % 6 + player.level;
        Monster monster("숲의 늑대", newHp, newAtk, expReward);

        Battle::start(player, monster, town);
        if (!player.isAlive()) break;

        cout << "다음 전투를 하시겠습니까? (1. 계속 / 2. 마을로 돌아가기): ";
        int next;
        cin >> next;
        if (next != 1) break;
    }

    cout << "게임을 종료합니다.\n";
    return 0;
}
