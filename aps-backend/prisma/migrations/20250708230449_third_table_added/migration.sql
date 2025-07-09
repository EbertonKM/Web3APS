/*
  Warnings:

  - You are about to drop the column `ultimaLocalizacao` on the `Encomenda` table. All the data in the column will be lost.
  - You are about to drop the column `created` on the `Entregador` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "RastreamentoStatus" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "localizacao" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "dataRegistro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "encomendaId" INTEGER NOT NULL,
    CONSTRAINT "RastreamentoStatus_encomendaId_fkey" FOREIGN KEY ("encomendaId") REFERENCES "Encomenda" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Encomenda" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codRastreio" TEXT NOT NULL,
    "origem" TEXT NOT NULL,
    "destino" TEXT NOT NULL,
    "dataEmissao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "entregue" BOOLEAN NOT NULL,
    "observacoes" TEXT,
    "entregadorId" INTEGER,
    CONSTRAINT "Encomenda_entregadorId_fkey" FOREIGN KEY ("entregadorId") REFERENCES "Entregador" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Encomenda" ("codRastreio", "dataEmissao", "destino", "entregadorId", "entregue", "id", "observacoes", "origem") SELECT "codRastreio", "dataEmissao", "destino", "entregadorId", "entregue", "id", "observacoes", "origem" FROM "Encomenda";
DROP TABLE "Encomenda";
ALTER TABLE "new_Encomenda" RENAME TO "Encomenda";
CREATE UNIQUE INDEX "Encomenda_codRastreio_key" ON "Encomenda"("codRastreio");
CREATE TABLE "new_Entregador" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Entregador" ("ativo", "id", "nome", "telefone") SELECT "ativo", "id", "nome", "telefone" FROM "Entregador";
DROP TABLE "Entregador";
ALTER TABLE "new_Entregador" RENAME TO "Entregador";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
