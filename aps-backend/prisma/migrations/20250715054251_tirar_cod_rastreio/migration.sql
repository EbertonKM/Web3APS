/*
  Warnings:

  - You are about to drop the column `codRastreio` on the `Encomenda` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Encomenda" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "origem" TEXT NOT NULL,
    "destino" TEXT NOT NULL,
    "dataEmissao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "entregue" BOOLEAN NOT NULL,
    "observacoes" TEXT,
    "entregadorId" INTEGER,
    CONSTRAINT "Encomenda_entregadorId_fkey" FOREIGN KEY ("entregadorId") REFERENCES "Entregador" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Encomenda" ("dataEmissao", "destino", "entregadorId", "entregue", "id", "observacoes", "origem") SELECT "dataEmissao", "destino", "entregadorId", "entregue", "id", "observacoes", "origem" FROM "Encomenda";
DROP TABLE "Encomenda";
ALTER TABLE "new_Encomenda" RENAME TO "Encomenda";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
