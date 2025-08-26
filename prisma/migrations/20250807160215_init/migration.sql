-- CreateTable
CREATE TABLE "public"."Livros" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "lancamento" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Livros_pkey" PRIMARY KEY ("id")
);
