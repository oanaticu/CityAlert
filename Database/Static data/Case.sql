USE [CityAlert]
GO
SET IDENTITY_INSERT [dbo].[Case] ON 

GO
INSERT [dbo].[Case] ([CaseId], [Code], [SysCategoryId], [SysStatusId], [CreatedOn], [IsPublic], [Description], [StreetName], [StreetNo], [CityName], [Title], [Lat], [Long], [ImageName]) VALUES (2, N'6ccbaf14-28f8-43c7-a53f-55ce52b039b3', 2, 1, CAST(0x0000A4D600000000 AS DateTime), 1, N'cev ecva', N'Zizin', N'1', N'Bucuresti', N'Nu merge becul', N'23.56', N'56.25', N'aston-martin-db4.jpg')
GO
SET IDENTITY_INSERT [dbo].[Case] OFF
GO
