CREATE TABLE [dbo].[UsuariosExternos](
    [Id] INT IDENTITY(1,1) NOT NULL,
    [Username] VARCHAR(30) NOT NULL,
    [EMail] VARCHAR(50) NULL,
    [PasswordHash] VARCHAR(50) NULL,
    [CreatedAt] DATETIME NOT NULL DEFAULT GETDATE(),
    [UpdatedAt] DATETIME NOT NULL DEFAULT GETDATE(),
    [DeletedAt] DATETIME NULL
)

CREATE TRIGGER trg_UpdateUsuariosExternosTimestamp
ON [dbo].[UsuariosExternos]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE [dbo].[UsuariosExternos]
    SET [UpdatedAt] = GETDATE()
    FROM inserted
    WHERE [dbo].[UsuariosExternos].[Id] = inserted.[Id];
END;