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
// 마을 시스템 (퀘스트 관리 포함)
class Town {
public:
    int questStep = 0;  //현재 진행중인 퀘스트 단계
    Quest* activeQuest = nullptr;


    void enter() {
        int choice;
        while (true) {
            cout << "\n====================================\n";
            cout << "        마을에 도착했습니다!       \n";
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
        if (questStep == 0) {
            cout << "\n 촌장: '어이, 자네! 우리 마을사람들을 위해서 좀 도와주게나!'\n";
            cout << "촌장: '요즘 숲속에서 늑대들이 많아지고 있어. 마을을 위협하는군.'\n";
            cout << " 새로운 퀘스트: '숲의 늑대 3마리 처치'\n";
            activeQuest = new Quest("숲의 늑대 3마리 처치", 3);
            questStep++;
        } else if (questStep == 1 && activeQuest->checkCompletion()) {
            cout << "\n촌장: '잘해줬네! 하지만 문제가 더 심각해...'\n";
            cout << "촌장: '이제 고블린들이 마을 근처까지 내려오고 있어!'\n";
            cout << "새로운 퀘스트: '고블린 5마리 처치'\n";
            delete activeQuest;
            activeQuest = new Quest("고블린 5마리 처치", 5);
            questStep++;
        } else if (questStep == 2 && activeQuest->checkCompletion()) {
            cout << "\n촌장: '이건 단순한 몬스터 문제가 아니야...'\n";
            cout << "촌장: '전설에 따르면, 어둠의 마왕이 깨어나려 할 때 몬스터들이 이상 행동을 보인다고 하더군.'\n";
            cout << "촌장: '자네가 정말로 용감하다면… 어둠의 동굴을 조사해 보지 않겠나?'\n";
            cout << "새로운 퀘스트: '어둠의 동굴 조사'\n";
            delete activeQuest;
            activeQuest = new Quest("어둠의 동굴 조사", 1);
            questStep++;
        } else {
            cout << "\n촌장: '아직 퀘스트를 완료하지 않았군! 계속 진행해 주게.'\n";
        }
    }
};

class Monster {
public:
    string name;
    int hp, atk, expReward;

    Monster(string n, int baseHp, int baseAtk, int baseExp, int level) {
        name = n;
        hp = baseHp + level * 2;   // 레벨당 체력 +2 증가
        atk = baseAtk + level;     // 레벨당 공격력 +1 증가
        expReward = baseExp + level * 2; // 레벨당 경험치 보상 증가
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
        expToNextLevel = 15; // 경험치 요구량 상향 조정
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
            expToNextLevel += 8;
            maxHp += 8;
            atk += 3;
            hp = maxHp;
            cout << "레벨 업! " << name << "이(가) 레벨 " << level << "이 되었습니다! (HP: " << maxHp << ", ATK: " << atk << ")\n";
        }
    }

    void healAfterBattle() {
        int healAmount = maxHp / 4;  // 전투 후 최대 체력의 25% 회복
        hp += healAmount;
        if (hp > maxHp) hp = maxHp;
        cout << " 전투 후 체력 회복! 현재 체력: " << hp << "/" << maxHp << "\n";
    }
};

class Battle {
public:
    static void start(Character& player, Monster& monster, Town& town) {
        cout << monster.name << "이(가) 나타났다! (HP: " << monster.hp << ", ATK: " << monster.atk << ")\n";

        while (player.isAlive() && monster.isAlive()) {
            cout << player.name << "의 턴! (내 HP: " << player.hp << "/" << player.maxHp << ", ATK: " << player.atk << ")\n";
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

                    player.healAfterBattle(); // 전투 후 체력 회복

                    // 퀘스트 진행도 추가
                    if (town.activeQuest != nullptr) {
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
    Character player("나", 30, 5);
    Town town;

    while (player.isAlive()) {
        town.enter();

        int newHp = 10 + player.level * 2;
        int newAtk = 2 + player.level;
        int expReward = 5 + player.level * 2;
        
        Monster monster("숲의 늑대", newHp, newAtk, expReward, player.level);

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
