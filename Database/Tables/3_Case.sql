USE [CityAlert]
GO

/****** Object:  Table [dbo].[Case]    Script Date: 7/20/2015 2:18:52 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Case](
	[CaseId] [int] IDENTITY(1,1) NOT NULL,
	[Code] [uniqueidentifier] NOT NULL,
	[SysCategoryId] [int] NOT NULL,
	[SysStatusId] [int] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[IsPublic] [bit] NOT NULL,
	[Description] [nvarchar](max) NULL,
	[StreetName] [nvarchar](500) NULL,
	[StreetNo] [nvarchar](500) NULL,
	[CityName] [nvarchar](500) NULL,
	[Title] [nvarchar](max) NULL,
	[Lat] [nvarchar](100) NULL,
	[Long] [nvarchar](100) NULL,
	[ImageName] [nvarchar](500) NULL,
 CONSTRAINT [PK_Case] PRIMARY KEY CLUSTERED 
(
	[CaseId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

ALTER TABLE [dbo].[Case] ADD  CONSTRAINT [DF_Case_Code]  DEFAULT (newid()) FOR [Code]
GO

ALTER TABLE [dbo].[Case] ADD  CONSTRAINT [DF_Case_CreatedOn]  DEFAULT (getdate()) FOR [CreatedOn]
GO

ALTER TABLE [dbo].[Case] ADD  CONSTRAINT [DF_Case_IsPublic]  DEFAULT ((0)) FOR [IsPublic]
GO

ALTER TABLE [dbo].[Case]  WITH CHECK ADD  CONSTRAINT [FK_Case_SysCategory] FOREIGN KEY([SysCategoryId])
REFERENCES [dbo].[SysCategory] ([SysCategoryId])
GO

ALTER TABLE [dbo].[Case] CHECK CONSTRAINT [FK_Case_SysCategory]
GO

ALTER TABLE [dbo].[Case]  WITH CHECK ADD  CONSTRAINT [FK_Case_SysStatus] FOREIGN KEY([SysStatusId])
REFERENCES [dbo].[SysStatus] ([SysStatusId])
GO

ALTER TABLE [dbo].[Case] CHECK CONSTRAINT [FK_Case_SysStatus]
GO


