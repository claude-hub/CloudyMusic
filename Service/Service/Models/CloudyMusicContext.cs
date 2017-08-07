using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Service.Models
{
    public partial class CloudyMusicContext : DbContext
    {
        public virtual DbSet<Admin> Admin { get; set; }
        public virtual DbSet<Album> Album { get; set; }
        public virtual DbSet<Music> Music { get; set; }
        public virtual DbSet<Permissions> Permissions { get; set; }
        public virtual DbSet<RolePermissions> RolePermissions { get; set; }
        public virtual DbSet<Roles> Roles { get; set; }
        public virtual DbSet<ToneQuality> ToneQuality { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<UserPermissions> UserPermissions { get; set; }
        public virtual DbSet<UserRoles> UserRoles { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            #warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
            optionsBuilder.UseSqlServer(@"Data Source=.;Initial Catalog=CloudyMusic;Integrated Security=True");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Admin>(entity =>
            {
                entity.HasOne(d => d.User)
                    .WithMany(p => p.Admin)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_ADMIN_REFERENCE_USER");
            });

            modelBuilder.Entity<Album>(entity =>
            {
                entity.Property(e => e.Intro)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(10);
            });

            modelBuilder.Entity<Music>(entity =>
            {
                entity.Property(e => e.LyricUrl).HasColumnType("varchar(100)");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(e => e.SingerName)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(e => e.SingerPhoto).HasColumnType("varchar(100)");

                entity.HasOne(d => d.Album)
                    .WithMany(p => p.Music)
                    .HasForeignKey(d => d.AlbumId)
                    .HasConstraintName("FK_MUSIC_REFERENCE_ALBUM");
            });

            modelBuilder.Entity<Permissions>(entity =>
            {
                entity.HasKey(e => e.PermissionId)
                    .HasName("PK_PERMISSIONS");

                entity.Property(e => e.PermissionId).ValueGeneratedNever();

                entity.Property(e => e.Code)
                    .IsRequired()
                    .HasColumnType("varchar(500)");

                entity.Property(e => e.CreationTime).HasColumnType("datetime");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<RolePermissions>(entity =>
            {
                entity.HasKey(e => new { e.RoleId, e.PermissionId })
                    .HasName("PK_ROLEPERMISSIONS");

                entity.HasOne(d => d.Permission)
                    .WithMany(p => p.RolePermissions)
                    .HasForeignKey(d => d.PermissionId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_ROLEPERM_REFERENCE_PERMISSI");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.RolePermissions)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_ROLEPERM_REFERENCE_ROLES");
            });

            modelBuilder.Entity<Roles>(entity =>
            {
                entity.HasKey(e => e.RoleId)
                    .HasName("PK_ROLES");

                entity.Property(e => e.RoleId).ValueGeneratedNever();

                entity.Property(e => e.Code).HasColumnType("varchar(20)");

                entity.Property(e => e.CreationTime).HasColumnType("datetime");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<ToneQuality>(entity =>
            {
                entity.Property(e => e.ToneQualityId).ValueGeneratedNever();

                entity.Property(e => e.MusicUrl)
                    .IsRequired()
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.HasOne(d => d.Music)
                    .WithMany(p => p.ToneQuality)
                    .HasForeignKey(d => d.MusicId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_TONEQUAL_REFERENCE_MUSIC");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnType("varchar(20)");

                entity.Property(e => e.Head).HasColumnType("varchar(max)");

                entity.Property(e => e.NickName).HasMaxLength(10);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnType("varchar(20)");

                entity.Property(e => e.PhoneNum).HasColumnType("varchar(12)");
            });

            modelBuilder.Entity<UserPermissions>(entity =>
            {
                entity.HasKey(e => new { e.AdminId, e.PermissionId })
                    .HasName("PK_USERPERMISSIONS");

                entity.HasOne(d => d.Admin)
                    .WithMany(p => p.UserPermissions)
                    .HasForeignKey(d => d.AdminId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_USERPERM_REFERENCE_ADMIN");

                entity.HasOne(d => d.Permission)
                    .WithMany(p => p.UserPermissions)
                    .HasForeignKey(d => d.PermissionId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_USERPERM_REFERENCE_PERMISSI");
            });

            modelBuilder.Entity<UserRoles>(entity =>
            {
                entity.HasKey(e => new { e.AdminId, e.RoleId })
                    .HasName("PK_USERROLES");

                entity.HasOne(d => d.Admin)
                    .WithMany(p => p.UserRoles)
                    .HasForeignKey(d => d.AdminId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_USERROLE_REFERENCE_ADMIN");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.UserRoles)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_USERROLE_REFERENCE_ROLES");
            });
        }
    }
}