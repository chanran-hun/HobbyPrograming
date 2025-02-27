#include <iostream>
#include <cstdlib>
#include <ctime>

using namespace std;

// ĳ����(�÷��̾�) Ŭ����
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
        expToNextLevel = 10; // �⺻ ����ġ �䱸��
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
        cout << name << "��(��) " << amount << " ����ġ�� ������ϴ�! (���� ����ġ: " << exp << "/" << expToNextLevel << ")\n";
        checkLevelUp();
    }

    void checkLevelUp() {
        while (exp >= expToNextLevel) {
            level++;
            exp -= expToNextLevel;
            expToNextLevel += 5;
            maxHp += 5;
            atk += 2;
            hp = maxHp;  // ������ �� ü�� ȸ��
            cout << "���� ��!" << name << "��(��) ���� " << level << "�� �Ǿ����ϴ�!HP: " << maxHp << ", ATK : " << atk << "\n";
        }
    }
};

// ���� Ŭ����
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

// ���� �ý��� Ŭ����
class Battle {
public:
    static void start(Character& player, Monster& monster) {
        cout << monster.name << "��(��) ��Ÿ����! (HP: " << monster.hp << ", ATK: " << monster.atk << ")\n";

        bool playerDefending = false; // ��� ���� ����

        while (player.isAlive() && monster.isAlive()) {
            cout << player.name << "�� ��! (�� HP: " << player.hp << "/" << player.maxHp << ", ��� HP: " << monster.hp << ")\n";
            cout << "1. ����  2. ���  3. ��������\n";
            int choice;
            cin >> choice;

            if (choice == 1) {
                // ũ��Ƽ�� Ȯ�� (20%)
                bool isCritical = (rand() % 100) < 20;
                int damage = isCritical ? player.atk * 1.5 : player.atk;

                monster.takeDamage(damage);
                cout << player.name << "��(��) " << monster.name << "���� " << damage << "�� ���ظ� ������!";
                if (isCritical) cout << " (ũ��Ƽ�� ��Ʈ!)";
                cout << "\n";

                if (!monster.isAlive()) {
                    cout << monster.name << "��(��) �����߷ȴ�!\n";
                    player.gainExp(monster.expReward);
                    return;
                }

            } else if (choice == 2) {
                playerDefending = true;
                cout << player.name << "��(��) ��� �¼��� ���մϴ�. (���� �� �޴� ���� 50% ����)\n";
            } else if (choice == 3) {
                int escapeChance = rand() % 100; // 0~99 ���� ���� ��
                if (escapeChance < 50) { // 50% Ȯ���� ���� ����
                    cout << player.name << "��(��) �����ƽ��ϴ�!\n";
                    return;
                } else {
                    cout << player.name << "��(��) ����ġ�� ������ �����߽��ϴ�!\n";
                }
            }

            // ������ ����
            cout << monster.name << "�� ��!\n";

            // ȸ�� Ȯ�� (15%)
            bool isEvaded = (rand() % 100) < 15;
            if (isEvaded) {
                cout << player.name << "��(��) ������ ������ ȸ���߽��ϴ�! \n";
            } else {
                int damage = monster.atk;
                if (playerDefending) {
                    damage /= 2; // ��� �� ������ ���� ����
                    playerDefending = false;
                }
                player.takeDamage(damage);
                cout << monster.name << "��(��) " << player.name << "���� " << damage << "�� ���ظ� ������!\n";
            }
        }

        if (!player.isAlive()) {
            cout << player.name << "��(��) ���������ϴ�... ���� ����!\n";
        }
    }
};

int main() {
    srand(time(0));

    Character player("���", 20, 5);

    while (player.isAlive()) {
        // ���ο� ���� ���� (������ �ö󰥼��� ������)
        int newHp = 15 + rand() % 10 + player.level * 5;
        int newAtk = 3 + rand() % 5 + player.level * 2;
        int expReward = 4 + rand() % 6 + player.level;

        Monster monster("����", newHp, newAtk, expReward);

        Battle::start(player, monster);
        if (!player.isAlive()) break;

        cout << "���� ������ �Ͻðڽ��ϱ�? (1. ��� / 2. ����): ";
        int next;
        cin >> next;
        if (next != 1) break;
    }

    cout << "������ �����մϴ�.\n";
    return 0;
}
