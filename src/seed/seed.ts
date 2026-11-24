import { db } from "@/config/database";
import {
  clients,
  profiles,
  workers,
  workerProfiles,
} from "@/db/schema";
import SecurityUtils from "@/core/security";
import { generateId } from "@/core/gereteId";
import { WorkerRole } from "@/core/enuns/workerRole";
import { eq } from "drizzle-orm";

const adminSeedData = {
  fullName: "Admin Express Base",
  email: "admin@express-base.com",
  phone: "11999999999",
  role: "ADMIN" as WorkerRole,
};

const clientSeedData = {
  fullName: "Cliente Express Base",
  email: "cliente@express-base.com",
  phone: "11955555555",
};

export async function seed() {
  console.log("🌱 Iniciando seed...");

  try {
    if (process.env.SEED_FORCE_RESET === "true") {
      console.log(
        "⚠️ SEED_FORCE_RESET=true — removendo dados existentes antes de semear...",
      );
      await db.transaction(async (tx) => {
        await tx
          .delete(workerProfiles)
          .where(eq(workerProfiles.id, workerProfiles.id));
        await tx.delete(workers).where(eq(workers.id, workers.id));
        await tx.delete(profiles).where(eq(profiles.id, profiles.id));
        await tx.delete(clients).where(eq(clients.id, clients.id));
      });
    }

    try {
      await db.select().from(clients).limit(1);
    } catch (connErr) {
      console.error(
        "❌ Não foi possível conectar ao banco de dados. Verifique `DATABASE_URL` e a conectividade.",
      );
      throw connErr;
    }

    const now = new Date();
    const hashedPassword = await SecurityUtils.hashPassword("123456");

    const existingAdmin = await db
      .select()
      .from(workerProfiles)
      .where(eq(workerProfiles.email, adminSeedData.email))
      .limit(1);

    if (!existingAdmin.length) {
      console.log("👷 Criando admin padrão...");
      await db.transaction(async (tx) => {
        const [worker] = await tx
          .insert(workers)
          .values({
            publicId: generateId(),
            role: adminSeedData.role,
            salary: "0",
            isActive: true,
            isAdmin: true,
            createdAt: now,
            updatedAt: now,
          })
          .returning();

        await tx.insert(workerProfiles).values({
          workerId: worker.id,
          email: adminSeedData.email,
          password: hashedPassword,
          fullName: adminSeedData.fullName,
          phone: adminSeedData.phone,
          avatarImage: null,
          createdAt: now,
          updatedAt: now,
        });
      });
    }

    const existingClient = await db
      .select()
      .from(clients)
      .where(eq(clients.email, clientSeedData.email))
      .limit(1);

    if (!existingClient.length) {
      console.log("👤 Criando cliente padrão...");
      await db.transaction(async (tx) => {
        const [client] = await tx
          .insert(clients)
          .values({
            publicId: generateId(),
            email: clientSeedData.email,
            password: hashedPassword,
            createdAt: now,
            updatedAt: now,
          })
          .returning();

        await tx.insert(profiles).values({
          clientId: client.id,
          fullName: clientSeedData.fullName,
          phone: clientSeedData.phone,
          avatarImage: null,
          createdAt: now,
          updatedAt: now,
        });
      });
    }

    console.log("✅ Seed concluída com sucesso!");
  } catch (error) {
    console.error("❌ Erro na seed:", error);
  }
}

if (require.main === module) {
  seed()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("❌ Falha ao executar seed:", error);
      process.exit(1);
    });
}
